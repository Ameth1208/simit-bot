import { flowFindPenalty } from "./flowFindPenalty";
import { flowFindPenaltyDetails } from "./flowFindPenaltyDetails";
import { flowWelcome } from "./welcome";

export const flow = [flowWelcome, flowFindPenalty, flowFindPenaltyDetails];
