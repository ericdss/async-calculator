import { Calculator } from "../../entities/Calculator";
import CalculatorDTO from "../../services/Calculator/DTOs/CalculatorDTO";
import NewSumDTO from "../../services/Calculator/DTOs/NewSumDTO";

interface ICalculatorService{
    getResult(id: string): Promise<CalculatorDTO | null>
    createSum(newSumDTO: NewSumDTO): Promise<CalculatorDTO | null>
}

export default ICalculatorService;