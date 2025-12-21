// Supabase数据库连接配置
const SUPABASE_URL = 'https://vlturfwdcjlrsoswkzvr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdHVyZndkY2pscnNvc3drenZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjIyMjA2MiwiZXhwIjoyMDgxNzk4MDYyfQ.fZNNS_1n7HI4r9IaIydfaewXbvzwVonG8I8EGlTvqqc';

// 初始化Supabase客户端
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 用户数据管理
class UserDataManager {
    constructor() {
        this.currentUser = null;
        this.initialized = false;
    }

    // 初始化用户会话
    async initialize() {
        try {
            // 检查当前会话
            const { data: { session }, error } = await supabaseClient.auth.getSession();
            
            if (error) {
                console.error('获取会话失败:', error.message);
                return false;
            }

            if (session) {
                this.currentUser = session.user;
                console.log('用户已登录:', this.currentUser.email);
                await this.loadUserData();
            }
            
            this.initialized = true;
            return true;
        } catch (error) {
            console.error('初始化失败:', error.message);
            return false;
        }
    }

    // 用户登录
    async signIn(email, password) {
        try {
            const { data, error } = await supabaseClientClientClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                throw error;
            }

            this.currentUser = data.user;
            await this.loadUserData();
            return { success: true, user: data.user };
        } catch (error) {
            console.error('登录失败:', error.message);
            return { success: false, error: error.message };
        }
    }

    // 用户注册
    async signUp(email, password, username) {
        try {
            const { data, error } = await supabaseClientClientClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username
                    }
                }
            });

            if (error) {
                throw error;
            }

            return { success: true, user: data.user };
        } catch (error) {
            console.error('注册失败:', error.message);
            return { success: false, error: error.message };
        }
    }

    // 用户登出
    async signOut() {
        try {
            const { error } = await supabaseClient.auth.signOut();
            
            if (error) {
                throw error;
            }

            this.currentUser = null;
            return { success: true };
        } catch (error) {
            console.error('登出失败:', error.message);
            return { success: false, error: error.message };
        }
    }

    // 保存游戏数据
    async saveGameData(gameData) {
        if (!this.currentUser) {
            console.error('用户未登录，无法保存游戏数据');
            return { success: false, error: '用户未登录' };
        }

        try {
            const { data, error } = await supabaseClientClient
                .from('game_data')
                .upsert({
                    user_id: this.currentUser.id,
                    data: gameData,
                    updated_at: new Date().toISOString()
                });

            if (error) {
                throw error;
            }

            return { success: true, data };
        } catch (error) {
            console.error('保存游戏数据失败:', error.message);
            return { success: false, error: error.message };
        }
    }

    // 加载游戏数据
    async loadUserData() {
        if (!this.currentUser) {
            console.error('用户未登录，无法加载游戏数据');
            return null;
        }

        try {
            const { data, error } = await supabaseClientClient
                .from('game_data')
                .select('data')
                .eq('user_id', this.currentUser.id)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 是没有找到记录的错误码
                throw error;
            }

            return data ? data.data : null;
        } catch (error) {
            console.error('加载游戏数据失败:', error.message);
            return null;
        }
    }

    // 保存游戏分数
    async saveGameScore(score, level, character) {
        if (!this.currentUser) {
            console.error('用户未登录，无法保存游戏分数');
            return { success: false, error: '用户未登录' };
        }

        try {
            const { data, error } = await supabaseClientClient
                .from('game_scores')
                .insert({
                    user_id: this.currentUser.id,
                    score: score,
                    level: level,
                    character: character,
                    created_at: new Date().toISOString()
                });

            if (error) {
                throw error;
            }

            return { success: true, data };
        } catch (error) {
            console.error('保存游戏分数失败:', error.message);
            return { success: false, error: error.message };
        }
    }

    // 获取排行榜
    async getLeaderboard(limit = 10) {
        try {
            const { data, error } = await supabaseClientClient
                .from('game_scores')
                .select(`
                    score,
                    level,
                    character,
                    created_at,
                    user: profiles(username)
                `)
                .order('score', { ascending: false })
                .limit(limit);

            if (error) {
                throw error;
            }

            return { success: true, data };
        } catch (error) {
            console.error('获取排行榜失败:', error.message);
            return { success: false, error: error.message };
        }
    }
}

// 创建全局数据管理器实例
const userDataManager = new UserDataManager();

// 页面加载完成后初始化Supabase
document.addEventListener('DOMContentLoaded', async function() {
    const initSuccess = await userDataManager.initialize();
    if (!initSuccess) {
        console.error('Supabase初始化失败');
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { supabase, userDataManager };
} else {
    window.supabase = supabaseClient;
    window.userDataManager = userDataManager;
}