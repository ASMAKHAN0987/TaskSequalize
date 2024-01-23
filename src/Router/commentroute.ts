import express from 'express';
import { commentcreate, replytocomment } from '../Controller/commentController';
const router = express.Router();
router.post('/:postId/createcomment',commentcreate)
// router.get('/:postId/getallcomments',getAllComments)
router.post('/:postId/reply/:commentId',replytocomment);
export default router