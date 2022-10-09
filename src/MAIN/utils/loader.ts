import path from "path";
// import CloverClient from "../CloverClient";
import fs from "fs";
import { CloverCLIextraOptions } from "../types";
import { CloverClient } from "../interfaces";

export default (client: any, extraOptions: CloverCLIextraOptions) => {
    function loadCommands(dir: string) //function for loading commands in a folder
	{
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				loadCommands(path.join(dir, file));
			} else if (file.endsWith(".js") || file.endsWith(".ts")) {
				const { default: option } = require(path.join(__dirname, dir, file));
				if (option.name) {
					if (client) {
						client.commands?.set(option.name, option);
					}
				}
			}
		}
	}

	function loadEvents(dir: string) //function for loading all events in a folder
	{
		let amount = 0;
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			if (stat.isDirectory()) {
				loadEvents(path.join(dir, file)); //if its a directory then do it again
			} else if (file.endsWith(".js") || file.endsWith(".ts")) {
				const event = require(path.join(dir, file));
				if (!event) {} else {
					let eventName = file.split(".")[0];
					client.on(eventName, event.default.bind(null, client));
					amount++;
				}
			}
		}

		return amount;
	}

    loadCommands("../../" + extraOptions.commandsFolder)
    loadEvents("../../" + extraOptions.eventsFolder)
}