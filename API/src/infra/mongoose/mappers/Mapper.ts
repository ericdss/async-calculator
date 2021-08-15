import mongoose from "mongoose";
import Entity from "../../../domain/entities/Entity";

abstract class Mapper{
    static toSchema(entity: Entity): unknown | null{
        throw new Error("Method not implemented.");
    }
    static toEntity(schema: any): Entity | null{
        throw new Error("Method not implemented.");
    }
    static toListEntity(schemaList: Array<any>): Array<unknown>{
        throw new Error("Method not implemented.");
    }
}

export default Mapper;