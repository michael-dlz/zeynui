"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../src/core/components/Input";
import {
  Autocomplete,
  Button,
  Select,
  SelectItem,
  Textarea,
} from "../../../src/core";
import { KeyIcon, UserIcon } from "lucide-react";

type FormValues = {
  name: string;
  role: string;
  permission: string;
  description: string;
};

const Form = () => {
  const existingUser = {
    name: "Federico",
    role: "admin",
    permission: "read",
    description: "This is a description",
  };
  const defaultValues: FormValues = {
    name: "",
    role: "user",
    permission: "delete",
    description: "",
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
      <Input
        {...register("name")}
        leftContent={<UserIcon className="size-4" />}
      />
      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <Select
            {...field}
            label="Role"
            rightContent={<UserIcon className="size-4" />}
          >
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
            leftContent={<KeyIcon className="size-4" />}
            options={[
              { value: "read", label: "Read" },
              { value: "write", label: "Write" },
              { value: "delete", label: "Delete" },
              { value: "update", label: "Update" },
              { value: "create", label: "Create" },
              { value: "inspect", label: "Inspect" },
              { value: "execute", label: "Execute" },
              { value: "manage", label: "Manage" },
              { value: "audit", label: "Audit" },
              { value: "report", label: "Report" },
              { value: "configure", label: "Configure" },
              { value: "monitor", label: "Monitor" },
            ]}
            {...field}
            label="Permission"
          />
        )}
      />
      <Textarea
        leftContent={<UserIcon className="size-4" />}
        {...register("description")}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
