import { CheckCircle, Circle, XCircle } from 'lucide-react';
import type { OrderStatus, OrderTimelineStep } from '@/types';
import { classNames } from '@/utils/format';

const STATUS_FLOW: { status: OrderStatus; label: string; description: string }[] = [
  { status: 'placed', label: 'Order Placed', description: 'Your order has been received.' },
  { status: 'confirmed', label: 'Confirmed', description: 'The restaurant has confirmed your order.' },
  { status: 'preparing', label: 'Preparing', description: 'Your food is being freshly prepared.' },
  { status: 'ready', label: 'Ready', description: 'Your order is ready for the next step.' },
  { status: 'out-for-delivery', label: 'Out for Delivery', description: 'Your order is on its way to you.' },
  { status: 'delivered', label: 'Delivered', description: 'Your order has been delivered. Enjoy!' },
];

export function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === 'cancelled') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-nonveg-500/30 bg-nonveg-500/5 p-8 text-center">
        <XCircle className="h-12 w-12 text-nonveg-500" />
        <h3 className="mt-3 font-serif text-xl font-semibold text-maroon-700">Order Cancelled</h3>
        <p className="mt-1 text-sm text-brown-500">This order has been cancelled. Please contact the restaurant for help.</p>
      </div>
    );
  }

  const currentIndex = STATUS_FLOW.findIndex((s) => s.status === status);
  const steps: OrderTimelineStep[] = STATUS_FLOW.map((s, i) => ({
    ...s,
    completed: i <= currentIndex,
  }));

  return (
    <ol className="relative space-y-6">
      {steps.map((step, i) => (
        <li key={step.status} className="relative flex gap-4">
          {i < steps.length - 1 && (
            <span
              className={classNames(
                'absolute left-4 top-10 h-full w-0.5',
                step.completed ? 'bg-veg-500' : 'bg-cream-300',
              )}
            />
          )}
          <span className="relative z-10 mt-0.5">
            {step.completed ? (
              <CheckCircle className="h-8 w-8 text-veg-500" />
            ) : (
              <Circle className="h-8 w-8 text-cream-300" />
            )}
          </span>
          <div className={classNames('pb-2', !step.completed && 'opacity-60')}>
            <p className={classNames('font-semibold', step.completed ? 'text-maroon-700' : 'text-brown-500')}>
              {step.label}
            </p>
            <p className="text-sm text-brown-500">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
