import express, { Router } from 'express'
import authUser from '../middleware/auth.middleware.js'
import upload from '../middleware/file.middleware.js'
import generateInterviewReport from '../services/ai.service.js'
import db from '../db.js'
import { readPdfText } from 'pdf-text-reader'
const interviewRouter = Router()

interviewRouter.post(
    "/",
    authUser,
    upload.single("resume"),
    async (req, res) => {

        try {

            

            const userId = req.user.id

            const {
                jobdescription,
                selfdescription
            } = req.body

          const resumeText = await readPdfText({ data: new Uint8Array(req.file.buffer) })


            const interviewReportByAi =
                await generateInterviewReport({
                    jobdescription,
                    selfdescription,
                    resume:resumeText
                })

            console.log({
                resumeText:resumeText,
                aiReport: interviewReportByAi,
                userId,
                jobdescription,
                selfdescription
            })

            db.query(
                "INSERT INTO interviewReport(user_id,jobDesciption,resume,selfDescription,matchScore) VALUES(?,?,?,?,?)",
                [
                    userId,
                    jobdescription,
                    resumeText,
                    selfdescription,
                    interviewReportByAi.matchScore
                ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        })
                    }

                    const reportId = result.insertId

                    for (let ques of interviewReportByAi.technicalquestions) {

                        db.query(
                            "INSERT INTO technicalQuestions(report_id, question, intention, answer) VALUES(?,?,?,?)",
                            [
                                reportId,
                                ques.question,
                                ques.intenton,
                                ques.answer
                            ]
                        )
                    }
                     for(let bques of interviewReportByAi.behavioralquestions){
            db.query("INSERT INTO behavioralQuestionschema(report_id,question,intention,answer) VALUES(?,?,?,?)",[reportId,
                 bques.question,
                 bques.intenton,
                 bques.answer])
        }
        for(let skill of interviewReportByAi.skillgap){
            db.query("INSERT INTO skillgap(report_id,skill,severity) VALUES(?,?,?)",[reportId,skill.skill,skill.severity])
        }
        for(let pplan of interviewReportByAi.preparationplan){
    db.query("INSERT INTO preparationplan(report_id,day,focus) VALUES(?,?,?)",
    [reportId, pplan.day, pplan.focus], (err, planResult) => {
        if(err) {
            console.log("preparationplan error:", err.message) 
            return
        }
        const planId = planResult.insertId 
        for(let task of pplan.tasks){
    db.query("INSERT INTO plantasks(plan_id,task) VALUES(?,?)", [planId, task.trim()])
}
    })
}
       

                    res.json({
                        success: true,
                        reportId,
                        report: interviewReportByAi
                    })
                }
            )

        } catch (error) {

            console.error(error)

            res.status(500).json({
                error: error.message
            })
        }
       
    }
)
interviewRouter.get("/report/:interviewid", authUser, (req, res) => {
    const { interviewid } = req.params
    const userId = req.user.id

    db.query("SELECT * FROM interviewReport WHERE sno=? AND user_id=?", [interviewid, userId], (err, report) => {
        if(err) return res.json({ error: err })
        if(report.length === 0) return res.json({ message: "report not found" })

        db.query("SELECT * FROM technicalQuestions WHERE report_id=?", [interviewid], (err, technical) => {
            if(err) return res.json({ error: err })

            db.query("SELECT * FROM behavioralQuestionschema WHERE report_id=?", [interviewid], (err, behavioral) => {
                if(err) return res.json({ error: err })

                db.query("SELECT * FROM skillgap WHERE report_id=?", [interviewid], (err, skills) => {
                    if(err) return res.json({ error: err })

                    db.query("SELECT * FROM preparationplan WHERE report_id=?", [interviewid], (err, plans) => {
                        if(err) return res.json({ error: err })

                        db.query("SELECT * FROM plantasks WHERE plan_id IN (?)", [plans.map(p => p.id)], (err, tasks) => {
                            if(err) return res.json({ error: err })

                            plans.forEach(plan => {
                                plan.tasks = tasks.filter(t => t.plan_id === plan.id)
                            })

                            res.json({
                                report: report[0],
                                technicalquestions: technical,
                                behavioralquestions: behavioral,
                                skillgap: skills,
                                preparationplan: plans
                            })
                        })
                    })
                })
            })
        })
    })
})
interviewRouter.get("/reports",authUser,(req,res)=>{
      const userId = req.user.id
      db.query("SELECT sno, jobDesciption,matchScore, selfDescription FROM interviewreport WHERE user_id=?",[userId],(err,result)=>{
        if(err){
            res.json({
                error:err
            })
        }else{
            res.json({
                reportno:result.sn,
                report:result
            })
        }
      })
})
export default interviewRouter