import React, { useState, useEffect } from "react";
import {
  User, Mail, Phone, MapPin, Building2, Stethoscope, Award,
  Lock, Save, Edit3, X, CheckCircle2, ShieldCheck, Clock,
  Calendar, Star, FileText
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

export const DoctorProfile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bio: "",
    workingHours: "",
    experience: ""
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "BS. Lê Hoài Nam",
        phone: user.phone || "0988 777 666",
        email: user.email || "doctor@mediq.ai",
        bio: user.bio || "Bác sĩ Chuyên khoa II với hơn 12 năm kinh nghiệm trong chẩn đoán và điều trị can thiệp tim mạch. Thành viên Hội Tim Mạch Học Việt Nam.",
        workingHours: user.workingHours || "Thứ Hai - Thứ Sáu (07:30 - 17:00)",
        experience: user.experience || "12 năm kinh nghiệm lâm sàng"
      });
    }
  }, [user]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      phone: formData.phone,
      bio: formData.bio,
      workingHours: formData.workingHours
    });
    setIsEditing(false);
    showToast("Đã cập nhật hồ sơ cá nhân thành công!");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"}
            alt={user?.name || "Doctor"}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-500 shadow-sm"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Trạng thái: Đang trực">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{user?.name || "BS. Lê Hoài Nam"}</h1>
              <p className="text-xs text-cyan-700 font-bold flex items-center justify-center sm:justify-start gap-1">
                <Award className="w-3.5 h-3.5" /> {user?.badge || "Bác sĩ Chuyên khoa II"}
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" /> Chỉnh Sửa Hồ Sơ
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" /> Lưu Thay Đổi
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-600" /> Chuyên khoa: <b className="text-slate-800">{user?.specialty || "Tim mạch"}</b>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" /> {user?.room || "Phòng 201 - Chuyên khoa Tim Mạch"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* System Locked Information */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Thông Tin Hệ Thống (Khóa)
              </span>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <p className="text-[11px] text-slate-400">
              Các trường thông tin sau do Ban Quản trị Bệnh viện xác thực và chỉ định, không thể tự chỉnh sửa.
            </p>

            <div className="space-y-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Mã nhân sự / Bác sĩ</span>
                <span className="font-mono font-bold text-slate-800">DOC-{user?.id || "101"}</span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Chuyên khoa công tác</span>
                <span className="font-bold text-slate-800">{user?.specialty || "Tim mạch"}</span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Phòng khám chỉ định</span>
                <span className="font-bold text-slate-800">{user?.room || "P.201 - Chuyên khoa Tim Mạch"}</span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Học vị / Chức danh</span>
                <span className="font-bold text-slate-800">{user?.badge || "Bác sĩ Chuyên khoa II"}</span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Quyền hạn hệ thống</span>
                <span className="font-mono font-bold text-cyan-700">ROLE_DOCTOR (Toàn quyền chẩn đoán & kê đơn)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editable Personal & Contact Info */}
        <div className="md:col-span-7">
          <form onSubmit={handleSave} className="bg-white border border-slate-200 shadow-xs rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase">
                Thông Tin Cá Nhân & Liên Hệ
              </span>
              <span className="text-xs text-slate-400">
                {isEditing ? "Đang chỉnh sửa" : "Chế độ xem"}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Họ và tên bác sĩ:</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold ${
                    isEditing
                      ? "bg-white border-cyan-500 text-slate-900 focus:outline-none"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Số điện thoại liên hệ:</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${
                      isEditing
                        ? "bg-white border-cyan-500 text-slate-900 focus:outline-none"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Email đăng nhập:</label>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-100 border-slate-200 text-slate-500 text-xs cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Khung giờ nhận khám:</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isEditing
                      ? "bg-white border-cyan-500 text-slate-900 focus:outline-none"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Giới thiệu kinh nghiệm & chuyên môn:</label>
                <textarea
                  rows={4}
                  disabled={!isEditing}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className={`w-full p-3 rounded-xl border text-xs leading-relaxed ${
                    isEditing
                      ? "bg-white border-cyan-500 text-slate-900 focus:outline-none"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Save className="w-4 h-4" /> Lưu Hồ Sơ
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
