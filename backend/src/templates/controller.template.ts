import { ServiceTemplate } from "./service.template.js";

class ControllerTemplate {
	service: ServiceTemplate;

	constructor(service: ServiceTemplate) {
		this.service = service;
	}
}

export default ControllerTemplate;
