import minimist from "minimist";

const optionalArgsObject = {
  alias: {
    m: "modo"
  },
  default: {
    modo: "fork"
  },
};

export const args = minimist(process.argv.slice(2), optionalArgsObject);


