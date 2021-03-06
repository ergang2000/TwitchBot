import { ICommandProps } from '.'
import { client } from '../index'
import { getStreamInfo } from '../utils'

export const description =
    'this command tells you how long the stream has been going on for. What, did you expect something witty?'

function parseMilli(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000)
    let minutes = Math.floor(seconds / 60)
    seconds %= 60
    const hours = Math.floor(minutes / 60)
    minutes %= 60

    return {
        hours,
        minutes,
        seconds,
    }
}

export default async ({ channel }: ICommandProps) => {
    const stream = await getStreamInfo()

    const startDate = new Date(stream.started_at)
    const now = new Date()
    const timePassed = now.getTime() - startDate.getTime()
    const { hours, minutes, seconds } = parseMilli(timePassed)

    client.say(
        channel,
        `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes.toString().padStart(2, '0')} minute${
            minutes !== 1 ? 's' : ''
        } and ${seconds.toString().padStart(2, '0')} second${seconds !== 1 ? 's' : ''}`,
    )
}
