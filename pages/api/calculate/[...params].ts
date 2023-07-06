import type { NextApiRequest, NextApiResponse } from 'next'
import { calculate } from "../../../utils/calculate";
import { Operation } from '../../../enums/Operation';

// why not just return a boolean?
const isOperation = (operation: any): operation is Operation => {
  return Object.values(Operation).includes(operation)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      );
    }
    const params = extractParams(req.query.params);
    let result: number;
    if (isOperation(params.operation)) {
      result = calculate(params.operation, params.first, params.second);
    } else {
      throw new Error(`Invalid operation: ${params.operation}`);
    }
    res.status(200).json({ result });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
/**
 * represents user input
 */
interface Params {
  /**
   * the operation the user entered
   */
  operation: string,
  /**
   * the first number the user entered
   */
  first: number,
  /**
   * the second number the user entered
   */
  second: number,
};

function extractParams(queryParams: string | string[] | undefined):Params {
  if (!queryParams) {
    throw new Error('Query params are missing.');
  }

  if (Array.isArray(queryParams) && queryParams.length !== 3) {
    throw new Error(
      `Query params should have 3 items. Received ${queryParams.length}: ${queryParams}`
    );
  }

  try {
    const params:Params = {
      operation: queryParams[0],
      first: parseInt(queryParams[1]),
      second: parseInt(queryParams[2]),
    };
    return params;
  } catch (e) {
    throw new Error(`Failed to process query params. Received: ${queryParams}`);
  }
}

