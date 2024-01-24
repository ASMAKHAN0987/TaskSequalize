interface CommentWithReplies {
    id: number;
    userId: string;
    username: string;
    comment: string;
    PostModelId: number;
    parentId: number | null;
    Replies: CommentWithReplies[];
  }