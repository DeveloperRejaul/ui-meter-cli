import { getPieChartAnimations, getPieChartCalculate, getPieChartDraw, getPieChartIndexCode, getPieChartTypes, getPieSlice } from "content";
import { Utils } from "./utils";
import fs from 'node:fs/promises';
import path from 'node:path'

export class Chart extends Utils {
    async createPieChart1 () {
        await this.createComponent(getPieChartIndexCode(), "pie-chart/Index")
        await this.createComponent(getPieChartAnimations(), "pie-chart/animation")
        await this.createComponent(getPieChartCalculate(), "pie-chart/calculate-angle")
        await this.createComponent(getPieSlice(), "pie-chart/pie-slice")
        await this.createComponent(getPieChartTypes(), "pie-chart/types")
        await this.createComponent(getPieChartDraw(), "pie-chart/draw")

        const config = await this.getConfig();
        const targetDir = path.join(path.join(process.cwd(),`${config.path.components}/pie-chart`));

        const font1 = await fs.readFile(path.resolve(__dirname, 'fonts/Roboto_Condensed-Regular.ttf'));
        const font2 = await fs.readFile(path.resolve(__dirname, 'fonts/Roboto-Bold.ttf'));

        await this.writeFile(font1, "Roboto_Condensed-Regular.ttf",  targetDir)
        await this.writeFile(font2, "Roboto-Bold.ttf",  targetDir)
    }
    
}

