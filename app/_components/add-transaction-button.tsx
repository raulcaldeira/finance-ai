"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild={true}>
            {/* A div contorna o problema do tooltip não aparecer com o botão desabilitado. O TooltipTrigger envolve a div para garantir que o tooltip funcione mesmo com o botão desabilitado. */}
            <div
              className={`${!userCanAddTransaction && "cursor-not-allowed"}`}
            >
              <Button
                className="rounded-full font-bold"
                onClick={() => setDialogIsOpen(true)}
                disabled={!userCanAddTransaction}
              >
                Adicionar transação
                <ArrowDownUpIcon />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction && (
              <p className="text-center">
                Você atingiu o limite de transações.
                <br />
                <Link
                  className="text-primary underline"
                  href={"/subscription"}
                  target="_blank"
                >
                  Atualize seu plano
                </Link>{" "}
                para criar transações ilimitadas.
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
