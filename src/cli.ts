import cac from 'cac'
import { name, version } from '../package.json'

const cli = cac(name)

cli.command('')
    .option('--test -t', 'arg description', { default: false })
    .action(() => {
    })

cli.help()
cli.version(version)
cli.parse()
