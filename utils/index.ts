import * as chalk from 'chalk'
import * as moment from 'moment-timezone'

// Text With Color
export const color = (text:string, color:string = 'white') => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

// Get Time 
export const processTime = (timestamp:any, now:any) => {
    return moment.duration(now - <any>moment(<any>timestamp * 1000)).asSeconds()
}

// Check is URL
export const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}

const usedCommandRecently = new Set()

export const isFiltered = (from) => {
    return !!usedCommandRecently.has(from)
}

export const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, 5000);
}
