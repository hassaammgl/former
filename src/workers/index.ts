import { emailWorker } from "./email";
import { saveFormWorker } from "./save_form";

emailWorker.start();
saveFormWorker.start();
