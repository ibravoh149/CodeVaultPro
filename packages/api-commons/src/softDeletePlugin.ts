import * as mongoose from "mongoose";

export function SoftDeletePlugin(schema: mongoose.Schema) {
  schema.add({ deletedAt: { type: Date, default: null } });

  // Exclude soft-deleted documents by default
  schema.pre<mongoose.Query<any, mongoose.Document>>(/^find/, function (next) {
    if (!(this.getFilter() as any).includeDeleted) {
      this.where({ deletedAt: null });
    }
    next();
  });

  // Soft delete method
  schema.methods.softDelete = async function () {
    this.deletedAt = new Date();
    await this.save();
  };

  // Restore method
  schema.methods.restore = async function () {
    this.deletedAt = null;
    await this.save();
  };

  // Static methods for deletion and restoration
  schema.statics.softDeleteById = async function (id: string) {
    return this.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  };

  schema.statics.restoreById = async function (id: string) {
    return this.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
  };
}
