QUnit.module('accounts');

QUnit.test("test account", function(assert) {
	assert.expect(4);
	let done = assert.async();
	frappe.run_serially([
		() => frappe.set_route('Tree', 'Account'),
		() => frappe.click_button('Expand All'),
		() => frappe.click_link('Debtors'),
		() => frappe.click_button('Edit'),
		() => frappe.timeout(1),
		() => {
			assert.ok(cur_frm.doc.root_type=='Asset');
			assert.ok(cur_frm.doc.report_type=='Balance Sheet');
			assert.ok(cur_frm.doc.account_type=='Receivable');
		},
		() => frappe.click_button('Ledger'),
		() => frappe.timeout(1),
		() => {
			// check if general ledger report shown
			assert.deepEqual(frappe.get_route(), ['query-report', 'General Ledger']);
			window.history.back();
			return frappe.timeout(1);
		},
		() => done()
	]);
});

QUnit.test("test bank charges account type", function(assert) {
	assert.expect(1);
	let done = assert.async();
	frappe.run_serially([
		() => frappe.set_route('Tree', 'Account'),
		() => frappe.click_button('Expand All'),
		() => frappe.click_link('Indirect Expenses'),
		() => frappe.click_button('Add Child'),
		() => cur_dialog.set_value('account_name', 'Account Name'),
		() => {
			assert.ok($.inArray('Bank Charges', $.map($("select[data-fieldname='account_type']"), $.text)));
		},
		() => cur_dialog.set_value('account_type', 'Bank Charges'),
		() => frappe.click_button('Create New'),
		() => done()
	]);
});
