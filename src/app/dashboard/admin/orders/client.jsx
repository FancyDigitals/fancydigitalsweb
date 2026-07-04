"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
  Hash,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const PLAN_LABELS = {
  pro_monthly: "Pro Monthly",
  pro_yearly: "Pro Yearly",
  agency_monthly: "Agency Monthly",
  agency_yearly: "Agency Yearly",
};

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("pending");
  const [actioning, setActioning] = useState({});

  async function loadOrders() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/orders/list?status=${filter}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load orders");
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadOrders(); }, [filter]);

  async function handleAction(orderId, action) {
    setActioning((prev) => ({ ...prev, [orderId]: action }));
    try {
      const res = await fetch("/api/admin/orders/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      await loadOrders();
    } catch (err) {
      alert(err.message);
    } finally {
      setActioning((prev) => ({ ...prev, [orderId]: null }));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#075a01] to-[#0a8f01] px-4 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Orders</h1>
            <p className="text-sm text-white/80">Review and approve pending payments</p>
          </div>
          <button
            onClick={loadOrders}
            className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {["pending", "approved", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-colors ${
                filter === s
                  ? "bg-[#075a01] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#075a01]/30"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-[#075a01]" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <p className="text-sm text-gray-500">No {filter} orders yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-200 p-5"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                      <Hash className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{order.reference_code}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#075a01]">
                      {order.currency === "NGN" ? "₦" : ""}
                      {Number(order.amount).toLocaleString()}
                      {order.currency !== "NGN" ? ` ${order.currency}` : ""}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {PLAN_LABELS[order.plan] || order.plan}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 w-16">Name:</span>
                    <span className="font-semibold text-gray-800">{order.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <a href={`mailto:${order.email}`} className="text-[#075a01] hover:underline">
                      {order.email}
                    </a>
                  </div>
                  {order.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      <a
                        href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#075a01] hover:underline"
                      >
                        {order.phone}
                      </a>
                    </div>
                  )}
                  {order.notes && (
                    <div className="mt-2 p-2.5 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Notes:</p>
                      <p className="text-sm text-gray-700">{order.notes}</p>
                    </div>
                  )}
                </div>

                {/* Status / Actions */}
                {order.status === "pending" && (
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleAction(order.id, "approve")}
                      disabled={actioning[order.id]}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#075a01] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50"
                    >
                      {actioning[order.id] === "approve" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <><CheckCircle2 className="h-4 w-4" />Approve & upgrade</>
                      )}
                    </button>
                    <button
                      onClick={() => handleAction(order.id, "reject")}
                      disabled={actioning[order.id]}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 disabled:opacity-50"
                    >
                      {actioning[order.id] === "reject" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <><XCircle className="h-4 w-4" />Reject</>
                      )}
                    </button>
                  </div>
                )}

                {order.status === "approved" && (
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-semibold">Approved</span>
                    {order.approved_at && (
                      <span className="text-gray-500">
                        · {new Date(order.approved_at).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}

                {order.status === "rejected" && (
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100 text-sm text-red-600">
                    <XCircle className="h-4 w-4" />
                    <span className="font-semibold">Rejected</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}