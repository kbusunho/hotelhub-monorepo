exports.listUsers = async (req, res) => {
  res.json({ users: [] });
};

exports.approveBusiness = async (req, res) => {
  res.json({ ok: true });
};
