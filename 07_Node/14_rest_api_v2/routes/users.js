import { Router } from 'express';
import { users } from '../data.js';

const router = Router();


router.get('/', (req, res) => {
    return res.send(Object.values(users));
});
router.get('/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});
router.post('/', (req, res) => {
    return res.send('POST HTTP method on user resource\n');
});
router.put('/', (req, res) => {
    return res.send('PUT HTTP method on user resource\n');
});
router.put('/:userId', (req, res) => {
    return res.send(
      `PUT HTTP method on user/${req.params.userId} resource\n`,
    );
});
router.delete('/', (req, res) => {
    return res.send('DELETE HTTP method on user resource\n');
});
router.delete('/:userId', (req, res) => {
    return res.send(
      `DELETE HTTP method on user/${req.params.userId} resource\n`,
    );
});

export { router };