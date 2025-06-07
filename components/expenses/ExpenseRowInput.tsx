import {Expense} from '@/services/expenses';
import {displayValue} from '@/utils/utils';

type ExpenseRowProps = {
    expense: Expense,
    type: 'value' | 'category' | 'date',
    onChange: (val: string) => void
}

export default function ExpenseRowInput({expense, type, onChange}: ExpenseRowProps) {
    const {value, category} = expense;


    if (type === 'value') {
        return <input type="number"
                      step={0.5}
                      min={1}
                      placeholder={displayValue(value)}
                      defaultValue={value}
                      className="input w-16 px-1 bg-base-300 border-1 border-primary rounded"
                      onChange={(e) => onChange(e.target.value)}
        />;
    }

    if (type === 'category') {
        return <input type="text"
                      placeholder={category}
                      defaultValue={category}
                      className="input w-24 px-2 bg-base-300 border-1 border-primary rounded"
                      onChange={(e) => onChange(e.target.value)}
        />;
    }

    return <input type="date"
                  className="input w-24 px-2 bg-base-300 border-1 border-primary rounded"
                  onChange={(e) => onChange(e.target.value)}
    />;
};
