import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  month,
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  userCanAddTransaction,
}: SummaryCards) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />

        <SummaryCard
          icon={<TrendingUpIcon className="text-primary" size={16} />}
          title="Receita"
          amount={depositsTotal}
        />

        <SummaryCard
          icon={<TrendingDownIcon className="text-red-500" size={16} />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
