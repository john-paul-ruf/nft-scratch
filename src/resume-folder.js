
// src/red-eye/red-eye-ewvkdsd/red-eye-ewvkdsd-settings.json

import inquirer from "inquirer";
import {LoopBuilder} from "my-nft-gen/src/core/animation/LoopBuilder.js";
import {Settings} from "my-nft-gen/src/core/Settings.js";
import * as fs from "fs";

const mainMenu = () => {
    const InitialActions = {
        Resume: 'Resume a build',
        Exit: 'Exit',
    };

    inquirer.prompt([
        {
            type: 'list',
            name: 'initialAction',
            message: 'Options',
            choices: [
                InitialActions.Resume,
                InitialActions.Exit,
            ],
        },
    ])
        .then((answers) => {
            switch (answers.initialAction) {
            case InitialActions.Exit:
                return;
            case InitialActions.Resume:
                inquirer.prompt([
                    {
                        name: 'filename',
                        message: 'Input settings file name',
                    },
                ])
                    .then((answers) => {
                        async function CreateLoop() {
                            const settings = Settings.from(JSON.parse(fs.readFileSync(answers.filename)));
                            const loopBuilder = new LoopBuilder(settings);
                            return loopBuilder.constructLoop();
                        }

                        const promiseArray = [];
                        promiseArray.push(CreateLoop());
                        Promise.all(promiseArray).then(() => {
                            mainMenu();
                        });
                    });
                break;
            }
        });
};

mainMenu();
