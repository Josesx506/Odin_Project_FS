import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Received a GET HTTP method\n');
});
router.post('/', (req, res) => {
    return res.send('Received a POST HTTP method\n');
});
router.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method\n');
});
router.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method\n');
});

export { router };