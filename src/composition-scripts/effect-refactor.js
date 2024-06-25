const promiseArray = [];

const createComposition = async (colorScheme) => {
    const myTestProject = new Project({
        artist: 'John Ruf',
        projectName: 'effect-refactor',
        projectDirectory: 'output/effect-refactor/',
        neutrals: ['#FFFFFF'],
        backgrounds: ['#000000'],
        numberOfFrame: 1800,
        colorScheme: colorScheme,
    });


    promiseArray.push(myTestProject.generateRandomLoop());
};

await createComposition(NeonColorSchemeFactory.getColorScheme(NeonColorScheme.neons));

await Promise.all(promiseArray);
