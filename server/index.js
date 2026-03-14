/* eslint-disable no-undef */

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });



    const app = express()

    app.use(cors());
    app.use(express.json())

    app.get("/api/tasks", async (req, res) => {
        const tasks = await prisma.task.findMany(   {orderBy: {id: "desc"}});
        res.json(tasks);
    })


    app.post("/api/tasks", async (req, res) => {
        const {topic, title, description, status } = req.body

        if (!title || !status) {
            return res.status(400).json({message: "title and status not require"})
        }

        const task = await prisma.task.create(
            {
            data: {
                topic: topic ?? "",
                title,
                description: description ?? "", 
                status,
            }, 
        })

        res.status(201).json(task)
    })


    app.patch("/api/tasks/:id", async (req, res) => {
        
        const id = Number(req.params.id)
        const { topic, title, description, status } = req.body;


        const task = await prisma.task.update({
            where: {id},
            data: {topic, title, description, status}
            
        })

        res.json(task);
    })

    app.delete("/api/tasks/:id", async (req, res) => {

        const id = Number(req.params.id)
        await prisma.task.delete({where:{id}})
        res.status(204).end()
    })


    const  PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`api running on http://localhost:${PORT}`))
