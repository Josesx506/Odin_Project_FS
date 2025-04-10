import { Router } from 'express';
import { messages } from "../data.js";
import pkg from 'uuid';


const uuidv4 = pkg["v4"];
const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(messages));
});
  
router.get('/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});

router.post('/', (req, res) => {
    const id = uuidv4();
    const message = {
      id,
      text: req.body.text,
      userId: req.me.id,
    };

    messages[id] = message;
  
    return res.send(message);
});


router.delete('/:messageId', (req, res) => {
    let messageId = req.params.messageId;
    const {
      [messageId]: message,
      ...otherMessages
    } = messages;
    
    if (message) {
        delete messages[messageId]; // Mutate the object instead of reassigning
    }
  
    return res.send(message);
});
  

export { router };