module.exports = (name, locals, index = false) =>
  `/* tslint:disable */
/* eslint-disable */

export interface ${name} {
${index ? "\t[index: string]: string;" : ""}
${locals.map((local) => `\t"${local.key}": "${local.value}";`).join("\n")}
}

export type I${name} = ${name};
export const locals: ${name};
export default locals;
`.trim();
