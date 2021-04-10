import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { GitHubToken } from "../../utils/interface";
import { handleErrors } from "../../utils/handleError"
import { User } from '../../models/index'
import axios from "axios";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) => {
  return jwt.sign({ id }, "chat group", {
    expiresIn: maxAge,
  });
};

export class UserController extends CrudController {
  public create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    const { code } = req.body;
    const body = {
      client_id: "686f5323f518cfc824f3",
      client_secret: "4684c25e7370d0f49e6d4d2e6ced6258ff2cf505",
      code,
      state: "randomstring",
    }
    const config = {
      headers: {
        Accept: "application/json",
      },
    }
    axios
      .post(
        "https://github.com/login/oauth/access_token", body, config )
      .then((response) => {
        if (response.data.error) {
          res.status(500);
        } else {
					axios.get('https://api.github.com/user', {
						headers: {
							'Authorization': `token ${response.data.access_token}`
						}
					}).then( responseFromGitHub => {
						const { id , name , avatar_url } = responseFromGitHub.data
						const update = {
							github_id: id,
							name,
							photo: avatar_url,
						}
						const option = {
							new: true,
							upsert: true
						}
						User.findOneAndUpdate({ github_id: id}, update, option).then( updatedResult => {
              const token = createToken(updatedResult?._id)
              res.cookie('jwt', token, { maxAge: maxAge * 1000 })
							res.status(201).json(updatedResult)
						}).catch(e => {
              console.log(e);
              
							res.status(400).json(e)
						})
					})
        }
      });
  }

  public async loginUsingEmail(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const { email, password } = req.body
    try {
      const user = await User.loginWithEmail(email, password)
      const token = createToken(user._id)
      res.cookie('jwt', token , { maxAge: maxAge *1000 })
      res.status(201).json(user._id)
    } catch (err) {
      const errors = handleErrors(err)
      res.status(400).json({errors})
    }
  }

  public async createUsingEmail(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const { email, password } = req.body
    try {
      const user = await User.create({email, password})
      const token = createToken(user._id)
      res.cookie('jwt', token , { maxAge: maxAge *1000 })
      res.status(201).json(user._id)
    } catch (err) {
      const errors = handleErrors(err)
      res.status(400).json({errors})
    }
  }

  public read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    const cookies = jwt.decode(req.cookies.jwt, {
      json: true
    })
    const id = cookies?.id
    const populate = {
      path: "channel",
      select: "name",
      // populate: {
      //   path: "message",
      //   model: "message",
      //   populate: {
      //     path: "user",
      //     model: "user",
      //   }
      // }
    }
    User.findById( id ).select('-password').populate( populate ).then( response => {
      res.json(response)
    })
    
  }

  public update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }

  public delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }
}
