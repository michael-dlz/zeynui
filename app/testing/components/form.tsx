"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../src/core/components/Input";
import { Autocomplete, Button, Select, SelectItem } from "../../../src/core";

type FormValues = {
  name: string;
  role: string;
  permission: string;
};

const Form = () => {
  const existingUser = {
    name: "Federico",
    role: "admin",
    permission: "read",
  };
  const defaultValues: FormValues = {
    name: "",
    role: "user",
    permission: "delete",
  };
  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = (data: {
    name: string;
    role: string;
    permission: string;
  }) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center gap-2">
        <Button type="button" onClick={() => reset(existingUser)}>
          Añadir existente usuario
        </Button>
        <Button type="button" onClick={() => reset(defaultValues)}>
          Resetear
        </Button>
      </div>
      <Input {...register("name")} />
      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <Select {...field} label="Role">
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </Select>
        )}
      />
      <Controller
        control={control}
        name="permission"
        render={({ field }) => (
          <Autocomplete
            options={[
              { value: "read", label: "Read" },
              { value: "write", label: "Write" },
              { value: "delete", label: "Delete" },
            ]}
            {...field}
            label="Permission"
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
