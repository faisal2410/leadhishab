import React, { useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import Spinner from "./Spinner";
import axios from "axios";

function AddEditTransaction({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("sheymoney-udemy-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
           payload : {
            ...values,
            userid: user._id,
           },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction Updated successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        getTransactions();
        message.success("Transaction added successfully");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      visible={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expence">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            {" "}
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="income tax">Income Tax</Select.Option>
            <Select.Option value="others commission">Others commission</Select.Option>
            <Select.Option value="celc junior">Celc Junior</Select.Option>
            <Select.Option value="celc genius">Celc genius</Select.Option>
            <Select.Option value="spoken advance">Spoken English Advance</Select.Option>
            <Select.Option value="ielts gt">IELTS GT</Select.Option>
            <Select.Option value="ielts academic">IELTS Academic</Select.Option>
            <Select.Option value="ielts lifeskills">IELTS Lifeskills</Select.Option>
            <Select.Option value="kc commission">KC Commission</Select.Option>
            <Select.Option value="universal commission">Universal Commission</Select.Option>
            <Select.Option value="monthly rent">Monthly Rent</Select.Option>
            <Select.Option value="electric bill">Electric Bill</Select.Option>
            <Select.Option value="sub agent commission">Subagent Commission</Select.Option>
            <Select.Option value="service charge">Service Charge</Select.Option>
            <Select.Option value="bank charge">Bank Charge</Select.Option>
            <Select.Option value="asset purchase">Asset Purchase</Select.Option>
            <Select.Option value="Faisal Withdraw">Faisal Withdraw</Select.Option>
            <Select.Option value="Habib Withdraw">Habib Withdraw</Select.Option>
            <Select.Option value="Airin Withdraw">Airin Withdraw</Select.Option>
            <Select.Option value="Fahim Withdraw">Fahim Withdraw</Select.Option>
            <Select.Option value="Fahim Investment">Fahim Investment</Select.Option>
            <Select.Option value="Faisal Investment">Faisal Investment</Select.Option>
            <Select.Option value="others">Others</Select.Option>
            <Select.Option value="repairing">Repairing</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
