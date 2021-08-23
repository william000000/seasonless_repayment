import MyQueries from "./MyQueries";
import { Customers } from "../database/models";

export class CustomerService {
    static async saveCustomer(req) {
        const { CustomerName } = req.body;
        return MyQueries.create(Customers, { CustomerName });
    }
    
}