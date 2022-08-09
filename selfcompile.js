import fs from 'fs/promises'
import compile from './redonkulizer.js'

async function selfcompile() {
    try {
        const redonkulizer = await fs.readFile('./redonkulizer.js', 'utf-8');

        const redonkulizerNoExport = redonkulizer.replace("export default compile", "");

        const metaRedonkulizer = compile(redonkulizerNoExport);

        await fs.writeFile('./meta-redonkulizer.js', metaRedonkulizer);

    } catch (err) {
        console.log("error", err);
    }
}

selfcompile();