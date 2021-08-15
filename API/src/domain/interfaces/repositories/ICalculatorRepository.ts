import { Calculator } from "../../entities/Calculator";

interface ICalculatorRepository {
    getById(id: string): Promise<Calculator | null>
    save(calculator: Calculator): Promise<Calculator | null>
}

export default ICalculatorRepository;