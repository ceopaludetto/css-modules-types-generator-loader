module.exports = (name, locals) =>
  `/* tslint:disable */
/* eslint-disable */

export interface ${name} {
  [index: string]: string;
${locals.map((local) => `\t"${local.key}": "${local.value}";`).join("\n")}
}

export type I${name} = ${name};
export const locals: ${name};
export default locals;
`.trim();
