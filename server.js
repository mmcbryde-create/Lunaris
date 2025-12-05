import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get all logs
app.get('/api/logs', async (req, res) => {
    try {
        const logs = await prisma.log.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching logs' });
    }
});

// Create a new log
app.post('/api/logs', async (req, res) => {
    const { title, content, date } = req.body;
    try {
        const newLog = await prisma.log.create({
            data: {
                title,
                content,
                date: date || new Date().toISOString().split('T')[0],
            },
        });
        res.json(newLog);
    } catch (error) {
        res.status(500).json({ error: 'Error creating log' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
