const fs = require('fs');
const path = require('path');

// Projenin ana dizinini ve taranacak kaynak dizini belirliyoruz
const rootDir = __dirname;
// "app" klasörü içindeki dosyaları tarayacağız (screens, components vs.)
const sourceDir = path.join(rootDir, 'app'); 
const outputFile = path.join(rootDir, 'audit-report.md');

// Taranmayacak gereksiz klasörler
const ignoreDirs = ['node_modules', '.expo', 'assets', '.git'];

// Denetim Kuralları (Audit Rules)
const rules = [
    {
        id: 'no-console',
        regex: /console\.log\(/g,
        message: 'Koda unutulmuş `console.log` bırakılmış. Performans için kaldırılmalı.'
    },
    {
        id: 'no-inline-styles',
        regex: /style=\{\{/g,
        message: 'Inline (satır içi) stil kullanımı tespit edildi. `StyleSheet.create` kullanılmalı.'
    },
    {
        id: 'no-todos',
        regex: /\/\/\s*TODO/gi,
        message: 'Tamamlanmamış TODO notu bulundu. Teslimden önce bitirilmeli veya kaldırılmalı.'
    }
];

let issuesFound = [];

// Klasörleri recursive (iç içe) tarayan fonksiyon
function walkDir(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
        const fullPath = path.join(currentPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (!ignoreDirs.includes(file)) {
                walkDir(fullPath);
            }
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            auditFile(fullPath);
        }
    }
}

// Dosya içeriğini okuyup kurallara göre denetleyen fonksiyon
function auditFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // 1. Kural: Dosya Uzunluğu
    if (lines.length > 200) {
        issuesFound.push({
            file: filePath,
            line: null,
            message: 'Dosya çok uzun (200 satırdan fazla). Bileşenlere bölünmesi (refactor) tavsiye edilir.'
        });
    }

    // 2. Kural: Regex Kuralları (console.log, inline style vb.)
    lines.forEach((line, index) => {
        rules.forEach(rule => {
            // Basit bir regex testi
            if (rule.regex.test(line)) {
                issuesFound.push({
                    file: filePath,
                    line: index + 1,
                    message: rule.message,
                    codeSnippet: line.trim()
                });
            }
            // Regex objesinin lastIndex'ini sıfırlıyoruz ki döngüde hata yapmasın
            rule.regex.lastIndex = 0; 
        });
    });
}

// Sonuçları Markdown formatında yazdıran fonksiyon
function generateMarkdown() {
    let md = `# Mobil Uygulama Denetim Raporu (Audit Report)\n\n`;
    md += `**Tarih:** ${new Date().toLocaleString('tr-TR')}\n\n`;
    
    if (issuesFound.length === 0) {
        md += `✅ **Harika!** Projede herhangi bir kural ihlali bulunamadı.\n`;
    } else {
        md += `⚠️ **Toplam ${issuesFound.length} adet düzeltilmesi gereken nokta bulundu.**\n\n`;
        md += `> **Coding Agent'a Talimat:** Lütfen aşağıdaki sorunları inceleyip ilgili dosyalarda gerekli refactor ve kod düzeltme işlemlerini uygula.\n\n`;
        
        // Hataları dosyalara göre gruplama
        const grouped = issuesFound.reduce((acc, issue) => {
            // Mutlak yolu proje dizinine göre görece yola çevir
            const relPath = path.relative(rootDir, issue.file).replace(/\\/g, '/');
            if (!acc[relPath]) acc[relPath] = [];
            acc[relPath].push(issue);
            return acc;
        }, {});

        for (const [file, issues] of Object.entries(grouped)) {
            md += `### 📁 Dosya: \`${file}\`\n`;
            issues.forEach(issue => {
                if (issue.line) {
                    md += `- [ ] **Satır ${issue.line}:** ${issue.message}\n`;
                    if (issue.codeSnippet) {
                        // Markdown kod bloğu içine al
                        md += `  \`\`\`javascript\n  ${issue.codeSnippet}\n  \`\`\`\n`;
                    }
                } else {
                    md += `- [ ] **Genel:** ${issue.message}\n`;
                }
            });
            md += `\n`;
        }
    }
    
    fs.writeFileSync(outputFile, md, 'utf-8');
    console.log(`✅ Denetim tamamlandı! Rapor oluşturuldu: ${outputFile}`);
}

// Scripti başlat
console.log('🔍 Mobil Audit başlatılıyor...');
walkDir(sourceDir);
generateMarkdown();
