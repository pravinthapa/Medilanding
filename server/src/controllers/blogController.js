import BlogPost from '../models/BlogPost.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

export const getBlogPosts = asyncHandler(async (req, res) => {
  const filter = req.user ? {} : { isPublished: true };
  const posts = await BlogPost.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: posts });
});

export const getBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({
    $or: [{ slug: req.params.slugOrId }, { _id: req.params.slugOrId }],
    ...(req.user ? {} : { isPublished: true }),
  });
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json({ success: true, data: post });
});

export const createBlogPost = asyncHandler(async (req, res) => {
  const slug = req.body.slug || slugify(req.body.title);
  const post = await BlogPost.create({ ...req.body, slug });
  res.status(201).json({ success: true, data: post });
});

export const updateBlogPost = asyncHandler(async (req, res) => {
  if (req.body.title && !req.body.slug) {
    req.body.slug = slugify(req.body.title);
  }
  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json({ success: true, data: post });
});

export const deleteBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json({ success: true, message: 'Post deleted' });
});
