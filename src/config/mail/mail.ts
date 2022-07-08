interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

const mail = {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'api-vendas@georginisnascimento.com.br',
      name: 'Georginis M. do Nascimento',
    },
  },
} as IMailConfig;

export { mail };
