import shell from 'shelljs'

export const Shell = shell

export const CommandExists = (command: string) => {
    return shell.which(command) ? true : false
}

export const PackageExists = (name: string) => {
    const version = shell.exec(`yarn list ${name} depth | grep "└─"`, { silent: true }).stdout
    return version && version.indexOf(name) !== -1 ? true : false
}