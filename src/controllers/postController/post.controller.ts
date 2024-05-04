import { Request, Response } from "express";
import Post from "../../models/post.model";
import path from "path";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { description, createdBy } = req.body;
    const imagePath = req.file
      ? path.join(
          req.protocol + "://" + req.get("host"),
          "/public/uploads/",
          req.file.filename
        )
      : "";
      console.log("IMAGE PATh",imagePath);
      
    const newPost = new Post({
      image: req.file ? imagePath : "",
      description,
    });
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// export const createPost = upload.single('image'), (req: Request, res: Response) => {
//   console.log("REQ body", req.body);
//   try {
//     const { image, description, createdBy } = req.body;
//     const newPost = new Post({
//       image,
//       description,
//       createdBy,
//       updatedBy: createdBy, // createdBy is also updatedBy initially
//     });
//     const savedPost = await newPost.save();
//     res.status(201).json({ success: true, data: savedPost });
//   } catch (error) {
//     console.error("Error creating post :", error);
//     res.status(500).send({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
export const getPost = async (req: Request, res: Response) => {};
export const updatePost = async (req: Request, res: Response) => {};
export const deletePost = async (req: Request, res: Response) => {};
