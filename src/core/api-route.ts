import { Handler } from "express";

export type endPoint = {
    route: string;
    handler: Handler;
};

export abstract class ApiRoute {
    constructor(protected route: string) { }

    abstract registerEndpoints(endPoints: [endPoint]): void;
}