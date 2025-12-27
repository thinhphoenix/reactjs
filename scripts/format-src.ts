import * as fs from 'fs';
import * as path from 'path';

/**
 * Converts camelCase or PascalCase to kebab-case
 * Examples: helloWorld -> hello-world, HelloWorld -> hello-world
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Recursively renames folders and files in the given directory
 */
function renameItems(dir: string): void {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Process folders first (depth-first)
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Process subdirectories first
      renameItems(fullPath);

      const kebabName = toKebabCase(entry.name);
      if (entry.name !== kebabName) {
        const newPath = path.join(dir, kebabName);

        if (!fs.existsSync(newPath)) {
          fs.renameSync(fullPath, newPath);
        }
      }
    }
  }

  // Refresh entries after folder renames
  const updatedEntries = fs.readdirSync(dir, { withFileTypes: true });

  // Process files
  for (const entry of updatedEntries) {
    if (!entry.isFile()) continue;

    const fullPath = path.join(dir, entry.name);
    const ext = path.extname(entry.name);
    const nameWithoutExt = path.basename(entry.name, ext);
    const kebabName = toKebabCase(nameWithoutExt);
    const newFileName = kebabName + ext;

    if (entry.name !== newFileName) {
      const newPath = path.join(dir, newFileName);

      if (!fs.existsSync(newPath)) {
        fs.renameSync(fullPath, newPath);
      }
    }
  }
}

// Main execution
const srcDir = path.join(process.cwd(), 'src');
renameItems(srcDir);
