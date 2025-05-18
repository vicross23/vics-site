"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EyeOffIcon, EyeIcon, Loader2 } from "lucide-react";
import { useState, useId } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const PasswordEntry = () => {
  const router = useRouter();
  const id = useId();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitPasswordMutation = useMutation({
    mutationFn: () => axios.post("/api/authenticate", { password }),
  });

  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    try {
      await submitPasswordMutation.mutateAsync();
      router.refresh();
    } catch {}
  };

  return (
    <div className="grow flex flex-col justify-center items-center p-4 md:p-8">
      <Card className="w-full max-w-md gap-4">
        <CardHeader>
          <CardTitle className="text-xl">
            This page is password protected
          </CardTitle>
          <CardDescription>
            Please enter the password to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="*:not-first:mt-2">
            <div className="relative">
              <Input
                id={id}
                className="pe-9"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                aria-controls="password"
              >
                {showPassword ? (
                  <EyeOffIcon size={16} aria-hidden="true" />
                ) : (
                  <EyeIcon size={16} aria-hidden="true" />
                )}
              </button>
            </div>
            {submitPasswordMutation.error && (
              <p className="text-destructive text-sm">Incorrect password</p>
            )}
          </div>
          <CardAction className="w-full">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={submitPasswordMutation.isPending}
            >
              Submit
              {submitPasswordMutation.isPending && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </CardAction>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordEntry;
