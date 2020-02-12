class AdminController {
  index(req, res) {
    return res.render('admin/admin', { title: 'Ticket Atlética - Admin' });
  }
}

module.exports = new AdminController();
