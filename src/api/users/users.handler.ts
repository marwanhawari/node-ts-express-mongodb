import { Request, Response, NextFunction } from "express";
import { ObjectId, Filter, WithId } from "mongodb";
import { db } from "../../db/mongodb";
import { User, UserPathParameter, UserQueryParameter } from "./users.model";

const MONGODB_COLLECTION = "users";
const collection = db.collection<User>(MONGODB_COLLECTION);

export async function findAll(
    req: Request<{}, {}, {}, UserQueryParameter>,
    res: Response<WithId<User>[]>,
    next: NextFunction
) {
    const requestedUserAge = req.query.age;
    const requestedUserRole = req.query.role;

    let queryFilter: UserQueryParameter = {};
    if (requestedUserAge) {
        queryFilter.age = requestedUserAge;
    }
    if (requestedUserRole) {
        queryFilter.role = requestedUserRole;
    }

    try {
        let results = await collection.find(queryFilter).toArray();
        res.json(results);
    } catch (error) {
        next(error);
    }
}

export async function findOne(
    req: Request<UserPathParameter>,
    res: Response<WithId<User>>,
    next: NextFunction
) {
    const userId = req.params.id;

    try {
        const queryFilter = { _id: new ObjectId(userId) };
        let result = await collection.findOne(queryFilter);
        if (!result) {
            res.status(404);
            throw new Error(`Failed to find the user with id ${userId}.`);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function createOne(
    req: Request<{}, {}, User>,
    res: Response,
    next: NextFunction
) {
    try {
        let result = await collection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateOne(
    req: Request<UserPathParameter, {}, User>,
    res: Response,
    next: NextFunction
) {
    const userId = req.params.id;

    try {
        const updateFilter = { _id: new ObjectId(userId) };
        let result = await collection.updateOne(updateFilter, {
            $set: { ...req.body },
        });
        if (result.modifiedCount < 1) {
            res.status(404);
            throw new Error(`Failed to update the user with id ${userId}.`);
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteOne(
    req: Request<UserPathParameter, {}, User>,
    res: Response,
    next: NextFunction
) {
    const userId = req.params.id;

    try {
        const deleteFilter = { _id: new ObjectId(userId) };
        let result = await collection.deleteOne(deleteFilter);
        if (result.deletedCount != 1) {
            res.status(404);
            throw new Error(`Failed to delete the user with id ${userId}.`);
        }
        res.status(204).json(result);
    } catch (error) {
        next(error);
    }
}
