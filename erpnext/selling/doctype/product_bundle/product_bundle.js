// Copyright (c) 2017, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on('Product Bundle', {
	setup: function(frm) {
		frm.set_query('new_item_code', function() {
			return {
				query: 'erpnext.selling.doctype.product_bundle.product_bundle.get_new_item_code'
			}
		});
	},

	refresh: function(frm) {
		frm.toggle_enable('new_item_code', frm.doc.__islocal);
	},

	onload: function(frm) {
		frm.add_fetch('item_code', 'stock_uom', 'uom');
		frm.add_fetch('item_code', 'description', 'description');
	}
});